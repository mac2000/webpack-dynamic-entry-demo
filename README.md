# webpack dynamic entry

Idea here is to demonstrate how you can achieve dynamic entries in webpack.

By dynamic I mean that you starting server `npm start` or if you are using IIS just add it as an local site and start coding, adding new file should not be an issue and require you to do something, so if you add `src/b.js` it should be immediatelly accessible as `/b.js` without any action required.

The first thing you will find is to use [glob](https://github.com/webpack/webpack/issues/370#issuecomment-49835937) for entry, but unfortunatelly once webpack got its entries it wont reevaluate them.

In my case I'm using IIS as web server and [iisnode](https://github.com/tjanczuk/iisnode) module to server node js apps.

What is cool about it is that it is already watching for file changes and restart an app if needed. But unfortunatelly there is also an [catch](https://github.com/tjanczuk/iisnode/issues/426).

But there is still an way to achieve desired behavior without watching for files or heavy reloading.

So, we are still using glob for entries as suggested, so our dist script will catch everything.

And the most interesting thing is going inside `server.js` idea here is that we are not going to look for file system but rather checking requested file via entries that glob give us and if there is an mismatch we just recreate compiler.

### Notes:

It is tricky demo, not everone need this kind of behavior and you should avoid it as much as possible.

Compiler instantiation is cheap and on my machine takes around 70ms.

There is not file system watchers so it may work well on projects with huge amounts of files.

For big projects it may be important to use lazy flag for dev server so we are going to do something only if asked for.

Every link to previous middleware and compiler is replaced so should be removed wth garbage collector, compiler itself takes less than 1kb of memory so it seems not to be an issue