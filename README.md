# shader-art-intro

This project is a very simple setup to allow me to learn some basic shader art
by using WebGL. It contains a http server made with express that servers a
very simple webpage with a single canvas that the included js draws on. The
included JS is bundled using Webpack.

I followed a YouTube [video](https://youtu.be/f4s1h2YETNY?si=FN4-OLnx-Hk1Xoff)
for the actual shader code. The only adaptation of my own was to use a rhombus
signed distance function for the shape, instead of a circle.

# Running this yourself

Make sure that you have node and npm, then install the dependencies by running
`npm install` and when it is finished then the server can be started with
`npm run start`. This step also builds the JS bundle using Webpack, which is
done in development mode so the bundle is quite large.
