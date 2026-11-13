# Equipo

The team: one card per person with their photo, name, role and GitHub handle (landing addition).

- **Consumer provides:** names, roles and handles from the main repo's README, and each person's photo from the team slide of the pitch deck (`assets/Team/<handle>.webp`, 192×192, already round with a transparent background).
- Photo `td-person__photo`: 64px circle on an `indigo100` ground, `alt=""` because the name is printed beside it. Never stock photos or generated faces; a person without a photo gets their initials on the same circle.
- Cards share a row height (`td-team > li` is flex). One column on phones, two from 640px, three from 1024px.
