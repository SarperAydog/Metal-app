-- Stage 2: the user's home city and ranked genres.
-- City and genre IDs refer to the app's data files (data/cities.json, data/genres.json).
alter table public.profiles add column home_city_id text;

create table public.user_genres (
  user_id uuid not null references auth.users (id) on delete cascade,
  genre_id text not null,
  rank integer not null check (rank >= 1),
  -- null means all subgenres of this genre.
  subgenre_ids text[],
  primary key (user_id, genre_id)
);

alter table public.user_genres enable row level security;

grant select, insert, delete on public.user_genres to authenticated;

create policy "Users read their own genres"
  on public.user_genres for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users add their own genres"
  on public.user_genres for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users remove their own genres"
  on public.user_genres for delete to authenticated
  using ((select auth.uid()) = user_id);

-- Replaces the whole list at once, so a failed save cannot leave it half written.
-- Input: [{ "genre_id": "...", "subgenre_ids": ["..."] or null }] in rank order.
create function public.save_my_genres(selections jsonb)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'Not signed in';
  end if;
  if jsonb_typeof(selections) <> 'array' or jsonb_array_length(selections) = 0 then
    raise exception 'Choose at least one genre';
  end if;
  delete from public.user_genres where user_id = auth.uid();
  insert into public.user_genres (user_id, genre_id, rank, subgenre_ids)
  select auth.uid(), s.genre_id, s.position, s.subgenre_ids
  from rows from (
    jsonb_to_recordset(selections) as (genre_id text, subgenre_ids text[])
  ) with ordinality as s (genre_id, subgenre_ids, position);
end;
$$;

revoke execute on function public.save_my_genres(jsonb) from public, anon;
grant execute on function public.save_my_genres(jsonb) to authenticated;
