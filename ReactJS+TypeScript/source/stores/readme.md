# Stores

@source https://youtu.be/N3tF7jtbKZY?t=14m12s

Stores are singletons (in this app, it's not some rule, but probably it's an easiest way to manage it).

Stores are in control of themselves, noone is orchestraiting them. Nobody is adding data to them, noone is adding to them.

They can manage collections: `FriendsStore`, `ItemsStore`; but can also manage something more abstract like `TimeStore` for managing timeline of the animation.

They are registering callbacks with a dispatcher. And callbacks are the only way data can come in. They define a callback. They manage how they will recive the data and what they will do with it.

They expose API of how you can get the data - getters.