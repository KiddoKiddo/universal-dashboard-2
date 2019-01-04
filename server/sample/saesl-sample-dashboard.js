module.exports = {
  name: 'SEASL Sample Dashboard',
  datasources: [
    {
      topics: [
        'seasl'
      ],
      name: 'mqtt-test',
      type: 'MQTT',
      host: 'localhost',
      rate: 2,
      rateUnit: 's'
    },
  ],
  panels: [
    {
      panel: 'Image',
      options: {
        url: 'https://3dfabprint.com/wp-content/uploads/sites/4/2014/08/3DP_ARTC_LOGO_HERO-15.jpg'
      },
      layoutId: 'ajx8KJSFj'
    },
    {
      datasource: {
        name: 'mqtt-test',
        index: 0
      },
      panel: 'StatusText',
      options: {
        idPath: 'machineName',
        statusPath: 'status',
        statusEncode: {
          0: 'Stop',
          1: 'Run',
          2: 'Idle',
          3: 'Setup'
        },
        statusStyle: {
          0: '#ffa4a2',
          1: '#98ee99',
          3: '#ffff8b'
        },
        showId: false
      },
      layoutId: '4tfq6Yuf8o'
    },
    {
      datasource: {
        name: 'mqtt-test',
        index: 0
      },
      title: 'Machine Name',
      panel: 'Text',
      options: {
        path: 'machineName'
      },
      layoutId: 'nW0NpMGjnu'
    },
    {
      datasource: {
        name: 'mqtt-test',
        index: 0
      },
      title: 'Operator Name',
      panel: 'Text',
      options: {
        path: 'operatorName'
      },
      layoutId: '7sfA2juC0e'
    },
    {
      datasource: {
        name: 'mqtt-test',
        index: 0
      },
      panel: 'Text',
      options: {
        path: 'reasonCode'
      },
      layoutId: 'OP3DrTaIHK'
    },
    {
      datasource: {
        name: 'mqtt-test',
        index: 0
      },
      panel: 'Text',
      options: {
        markup: '<div class=\'status-text-custom\'><div><span class=\'status-text-key\'>Stopping Time:</span> <span class=\'status-text-value\'>{{data.0}}</span> hours</div> <div><span class=\'status-text-key\'>Running Time:</span> <span class=\'status-text-value\'>{{data.1}}</span> hours</div> <div><span class=\'status-text-key\'>Idling Time:</span> <span class=\'status-text-value\'>{{data.2}}</span> hours</div> <div><span class=\'status-text-key\'>Setup Time:</span> <span class=\'status-text-value\'>{{data.3}}</span> hours</div></div>',
        markupPaths: [
          'stopTime',
          'runTime',
          'idleTime',
          'setupTime',
        ]
      },
      layoutId: 'UQOMD7ELZi'
    },
    {
      datasource: {
        name: 'mqtt-test',
        index: 0
      },
      panel: 'Text',
      options: {
        markup: '<div class=\'status-text-custom\'><div><span class=\'status-text-key\'>Up Time:</span> <span class=\'status-text-value\'>{{data.0}}</span> hours</div> <div><span class=\'status-text-key\'>Down Time:</span> <span class=\'status-text-value\'>{{data.1}}</span> hours</div></div>',
        markupPaths: [
          'upTime',
          'downTime',
        ]
      },
      layoutId: '_ebP6UOA5i'
    },
    {
      datasource: {
        name: 'mqtt-test',
        index: 0
      },
      panel: 'Text',
      options: {
        markup: 'Shift: {{data.0}}',
        markupPaths: ['shift'],
      },
      layoutId: 'oL3dEPmHBg'
    },
    {
      datasource: {
        name: 'mqtt-test',
        index: 0
      },
      panel: 'PieChart',
      options: {
        title: '',
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true
          }
        },
        series: [
          {
            type: 'pie',
            colorByPoint: true,
            name: 'Time of current shift',
            data: [
              'runTime',
              'stopTime',
              'idleTime',
              'setupTime',
            ]
          }
        ]
      },
      layoutId: 'IoePBydcBk'
    }
  ],
  layout: [
    {
      w: 4,
      h: 4,
      x: 0,
      y: 0,
      i: 'ajx8KJSFj'
    },
    {
      w: 4,
      h: 6,
      x: 0,
      y: 4,
      i: '4tfq6Yuf8o'
    },
    {
      w: 6,
      h: 4,
      x: 4,
      y: 0,
      i: 'nW0NpMGjnu'
    },
    {
      w: 6,
      h: 4,
      x: 10,
      y: 0,
      i: '7sfA2juC0e'
    },
    {
      w: 6,
      h: 6,
      x: 4,
      y: 4,
      i: 'OP3DrTaIHK'
    },
    {
      w: 10,
      h: 20,
      x: 0,
      y: 10,
      i: 'UQOMD7ELZi'
    },
    {
      w: 6,
      h: 6,
      x: 10,
      y: 24,
      i: '_ebP6UOA5i'
    },
    {
      w: 6,
      h: 6,
      x: 10,
      y: 4,
      i: 'oL3dEPmHBg'
    },
    {
      w: 6,
      h: 14,
      x: 10,
      y: 10,
      i: 'IoePBydcBk'
    }
  ],
};
