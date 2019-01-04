module.exports = {
  name: 'Sale Analysis',
  datasources: [
    {
      topics: [],
      queries: [
        'SELECT month_str as month, COUNT(no_sale_order) as noSaleOrder FROM sale_order_by_date WHERE str_to_date(date_str, \'%Y-%m-%d\') <= now() AND str_to_date(date_str, \'%Y-%m-%d\') >= (now() - INTERVAL 6 MONTH) GROUP BY month_str;',
        'SELECT month_str as month, item_code, item_name, brand, SUM(qty) as qty FROM sale_order_item_by_date WHERE str_to_date(date_str, \'%Y-%m-%d\') <= last_day(now()) AND str_to_date(date_str, \'%Y-%m-%d\') >=  LAST_DAY(now() - interval 2 MONTH) + INTERVAL 1 day GROUP BY item_code, item_name, brand, month_str;'
      ],
      name: 'mysql-twx',
      type: 'MYSQL',
      host: '192.168.129.19',
      port: 3306,
      username: 'thy',
      password: 'wabisabiT',
      database: 'fmcg_staging',
      rate: 5,
      rateUnit: 's'
    }
  ],
  panels: [
    {
      datasource: {
        name: 'mysql-twx',
        index: 0
      },
      panel: 'Text',
      options: {
        text: 'Sale Analysis',
        inlineStyle: {
          textAlign: 'left',
          fontSize: 30
        }
      },
      layoutId: 'BldCAn8Em'
    },
    {
      datasource: {
        name: 'mysql-twx',
        index: 1
      },
      panel: 'BarChartFMCG',
      options: {
        title: {
          text: 'Nestle'
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: 'No. of products'
          }
        },
        series: [
          {
            type: 'column',
            data: {
              _x: 'item_name',
              _y: 'qty',
              _group: [
                'month'
              ],
              _filter: {
                brand: 'Nestle'
              }
            }
          }
        ]
      },
      layoutId: 'umlKFasnM_'
    },
    {
      datasource: {
        name: 'mysql-twx',
        index: 1
      },
      panel: 'BarChartFMCG',
      options: {
        title: {
          text: 'Procter & Gamble'
        },
        yAxis: {
          title: {
            text: 'No. of products'
          }
        },
        xAxis: {
          type: 'category'
        },
        series: [
          {
            type: 'column',
            data: {
              _x: 'item_name',
              _y: 'qty',
              _group: [
                'month'
              ],
              _filter: {
                brand: 'Procter & Gamble'
              }
            }
          }
        ]
      },
      layoutId: '_o7_6i9fI'
    },
    {
      datasource: {
        name: 'mysql-twx',
        index: 0
      },
      panel: 'BarChartFMCG',
      options: {
        title: {
          text: 'Sale Trends'
        },
        yAxis: {
          title: {
            text: 'No. of Sale Orders'
          }
        },
        xAxis: {
          type: 'category'
        },
        legend: {
          enabled: false
        },
        series: [
          {
            type: 'line',
            data: {
              _x: 'month',
              _y: 'noSaleOrder'
            }
          }
        ]
      },
      layoutId: 'umlKFqonM_'
    }
  ],
  layout: [
    {
      w: 16,
      h: 2,
      x: 0,
      y: 0,
      i: 'BldCAn8Em'
    },
    {
      w: 8,
      h: 14,
      x: 0,
      y: 17,
      i: 'umlKFasnM_'
    },
    {
      w: 8,
      h: 14,
      x: 8,
      y: 17,
      i: '_o7_6i9fI'
    },
    {
      w: 11,
      h: 15,
      x: 0,
      y: 2,
      i: 'umlKFqonM_'
    }
  ],
};
