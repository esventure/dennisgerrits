## Goal

Give Dennis a simple, password-protected admin page where he can edit the existing **Stories** (title, intro, body) and swap their **images**, without being able to touch the site's structure or design.

## Approach

Enable **Lovable Cloud** (Supabase under the hood) and add:

1. A `stories` database table holding the editable content.
2. A storage bucket `story-images` for uploaded photos.
3. Email/password authentication (only Dennis gets an account; sign-up disabled).
4. A `user_roles` table + `has_role()` security-definer function so only `admin` users can write.
5. A new `/admin` route in the app with a simple editor UI (list of stories → edit form → image upload).
6. The public `Get Inspired` page reads stories from the database instead of the hard-coded array.

This keeps Dennis safely scoped to **content only**: he cannot add new sections, change layout, or break the site.

## What Dennis can do

- Log in at `/admin` with email + password.
- See the list of stories currently shown on *Get Inspired*.
- Edit a story's **title**, **intro**, **body**.
- Upload/replace the **image** for a story.
- Reorder stories (drag handle or up/down buttons).
- Save → changes appear live on the public page.

## What Dennis cannot do

- Create new pages or sections.
- Change colors, fonts, layout, or navigation.
- Edit other content (hero, services, about, etc.) — unless we add it later.
- Invite other users (sign-up is disabled; you stay the only account creator).

## Technical details

**Database**
```text
stories
 ├─ id (uuid, pk)
 ├─ slug (text, unique)        ← used for deep-link ?story=
 ├─ title (text)
 ├─ intro (text)
 ├─ body (text)
 ├─ image_path (text, nullable) ← key in story-images bucket
 ├─ sort_order (int)
 └─ updated_at (timestamptz)

user_roles
 ├─ user_id (uuid → auth.users)
 └─ role (app_role enum: 'admin')
```

**RLS policies**
- `stories`: `SELECT` public; `INSERT/UPDATE/DELETE` only when `has_role(auth.uid(), 'admin')`.
- `user_roles`: only admins can read/write.

**Storage**
- Bucket `story-images`, public read.
- Upload/delete restricted to admins via storage policies.

**Auth**
- Email + password, sign-up disabled in Cloud auth settings.
- I'll create Dennis's account by inserting via the auth admin tools after Cloud is on, then assign him the `admin` role. You'll share the temporary password with him; he can change it after first login.

**Frontend**
- New routes: `/admin/login`, `/admin` (protected).
- Admin UI: minimal, functional (table + edit drawer + image dropzone). Not styled to match the editorial site — it's a back-office.
- Existing `GetInspired.tsx` refactored to fetch stories with React Query; falls back gracefully while loading.
- Initial migration seeds the table with the current 4 hard-coded stories so nothing changes visually on day one.

## Steps when you approve

1. Enable Lovable Cloud.
2. Create migration: `stories` table, `app_role` enum, `user_roles` table, `has_role()` function, RLS policies, `story-images` bucket + policies. Seed existing stories.
3. Build `/admin/login` and `/admin` (list + edit + image upload).
4. Refactor `GetInspired.tsx` to read from the database.
5. Create Dennis's admin user and share credentials with you.

## Open questions

- Should the admin also manage the **Interests** cards and the **Day Map** stops, or just the Stories for now? (Easy to add later — I'd suggest starting with Stories only.)
- Do you want a single shared login for you + Dennis, or separate accounts?
