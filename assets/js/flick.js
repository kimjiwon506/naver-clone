const ficking1 = new Flicking("#flick1", {
  circular: true,
  duration: 1000,
  horizontal: false,
});

ficking1.addPlugins(new Flicking.Plugins.AutoPlay({ duration: 1000 }));
