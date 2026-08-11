insert into public.site_content (key, section, value) values
 ('concierge.tickets.title','process','Museum Reservations'),
 ('concierge.tickets.desc','process','Helping arrange tickets and timed-entry reservations for museums and cultural experiences.'),
 ('concierge.dining.title','process','Dining Reservations'),
 ('concierge.dining.desc','process','Thoughtfully selected restaurants, from local favorites to memorable dining experiences.'),
 ('concierge.transport.title','process','Transportation Coordination'),
 ('concierge.transport.desc','process','Help arranging transportation, including airport transfers, train tickets and local travel.'),
 ('concierge.private.title','process','Private Cars & Boats'),
 ('concierge.private.desc','process','Arranging private cars and boats for comfortable and seamless travel.'),
 ('concierge.hotel.title','process','Hotel & B&B Recommendations'),
 ('concierge.hotel.desc','process','Recommendations for hotels and B&Bs in locations that suit your travel style and plans.'),
 ('concierge.support.title','process','On-the-Ground Support'),
 ('concierge.support.desc','process','Personal support, practical help and local advice whenever you need it during your stay.')
on conflict (key) do update set value = excluded.value, updated_at = now(), published_at = now();

delete from public.site_content where key in ('concierge.itinerary.title','concierge.itinerary.desc');