const shortid = require('shortid');

module.exports = {

  generateLayout(panels) {
    return panels.map((p, i) => {
      const y = Math.ceil(Math.random() * 10) + 5; // Init height for each panel
      return {
        x: (i * 4) % 16,
        y: Math.floor(i / 6) * y,
        w: 4,
        h: y,
        i: p.layoutId, // To match with key attribute of each div inside ReactGridLayout
      };
    });
  },

  validateConfig(config) {
    const panels = config.panels.map(panel => Object.assign(panel, { layoutId: shortid() }));
    const layout = this.generateLayout(config.panels);
    return Object.assign(config, { layout, panels });
  },
};
