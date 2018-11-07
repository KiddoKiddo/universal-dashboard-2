module.exports = (io, sm) => {

  io.on('connection', (socket) => {
    console.log('[ Socket.IO ] A user connected with socket.id: ', socket.id);

    let serviceIds = [];

    socket.on('disconnect', () => {
      console.log('[ Socket.IO ] User disconnected with socket.id:', socket.id);

      serviceIds.forEach(id => sm.killService(id));
    });

    /*
      When the dashboard client first sends the dashboard config
    */
    socket.on('config', (config) => {
      console.log(`[ Socket.IO ] Dashboard config: ${config._id}`);

      // _id is dashboard id, used as room id
      const { _id, datasources } = config;

      // Used dashboardId as room id to join
      // WHY? For editor of the same dashboard to connect later
      socket.join(_id);

      if (datasources) {
        serviceIds = datasources.map(ds => sm.execService(socket, ds));
      }
    });
  });
};
