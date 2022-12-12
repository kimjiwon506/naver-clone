const ficking1 = new Flicking("#flick1", {
  circular: true,
  horizontal: false,
  stopOnHover: true,
});

ficking1.addPlugins(new Flicking.Plugins.AutoPlay({ stopOnHover: true }));
