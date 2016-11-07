import React from 'react';
import List from './lib/cmz/ui/list/List';
import Edit from './lib/cmz/ui/detail/Edit';
import Column from './lib/cmz/ui/list/Column';
import { ButtonEditCell, ImageCell, BoolCell, LongTextCell } from './lib/cmz/ui/cell';
import { TextField } from './lib/cmz/ui/field';

import listReplicator from './lib/cmz/alien/replicator/list';
// console.log(listReplicator())

export const PortfolioList = listReplicator({
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
        "author": {
          "column": {
            "hide": true,
            "cell": "longText"
          },
          "translated": true,
        },
        "title": {
          "column": {
            "hide": true,
            "cell": "longText"
          },
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
});

export const PortfolioList2 = (props) => (
  <List
    {...props}
    hasCreate={false}
    title="Portfolio"
    resource="portfolioitem"
  >
    <Column
      label="Header Image"
      source="header_image"
      width="20%"
      cell={ImageCell}
      cellProps={{ title: 'Agony is the price did you pay in the end!' }}
    />
    <Column
      label="Title"
      source="title"
    />
    <Column
      label="Author"
      source="author"
    />
    <Column
      label="Intro"
      source="intro"
      cell={LongTextCell}
      cellProps={{ truncateAt: 50 }}
    />
    <Column label="Body" source="body" cell={LongTextCell} />
    {/* Cool stuff from cool people */}
    <Column label="Pubblished" source="published" width="7em" cell={(props) => (
      <BoolCell {...props} colorTrue={'deepskyblue'} x={2} />
    )} />
    <Column label="Created" source="created" width="7em" />
    <Column label="Order" source="order" width="6em" />
    <Column cell={ButtonEditCell} />
  </List>
);

const PortfolioTitle = ({ record }) => (
  <span>Portfolio {record ? `"${record.title}"` : ''}</span>
);

export const PortfolioEdit = (props) => (
  <Edit
    {...props}
    title={PortfolioTitle}
    resource="portfolioitem"
  >
    <TextField label="Author" source="author" />
  </Edit>
);
