const schema = [
  {
    "resource": "news",
    "api": {
      "uri": "portfolioitem",
    },
    "menu": {
      "label": "News",
      "icon": "fa-...."
    },
    "resourceSchema": {
      "title": "News",
      "properties": {
        "title": {
          "translated": true,
        },
        "author": {
          "translated": true,
        }
      }
    },
    "ui": {
      "list": {
        "columns": [
          {
            "source": "title",
            "type": "text",
            "label": "Title",
            "translated": true
          },

        ],
        "filters": ["title"]
      }
    }
  }
];

export default schema;
