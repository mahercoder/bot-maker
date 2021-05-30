# bot-maker

Working principles: [scenario] -> [engine] -> [ products {[app_name_1], [app_name_2]} ]

./scenario/index.json:
     scenes: {
          backable: false,
          extras: { //default it equals to null!!!
               type: ['image', 'file', 'gif', 'video']
               url: 'https://some.url.here'
          }
     }