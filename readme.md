# Store app

Creating store application with different frameworks

### Application by used technology
* AngularJS
* ReactJS
* Backbone
* TypeScript
* Angular 2 (work in progress)
* EmberJS (work in progress)


Menu was created with help of http://www.json-generator.com/<br>
This is the code:
```javascript
[
  '{{repeat(5)}}',
  {
    id: '{{objectId()}}',
    category: '{{company()}}',
    description: '{{lorem(1, "paragraphs")}}',
    items: [
      '{{repeat(5, 8)}}',
      {
		id: '{{objectId()}}',
        name: '{{company()}}',
        price: '{{floating(1, 15, 2)}}',
        tax: '{{floating(0, 2, 2)}}',
        description: '{{lorem(1, "paragraphs")}}',
        modifiers: [
          '{{repeat(3, 5)}}',
          {
            id: '{{objectId()}}',
			name: '{{company()}}',
			price: '{{floating(0, 5, 2)}}'
          }
        ]
      }
    ]
  }
]
```

### How to start
The easiest way is to run
```
$ npm install
$ grunt serve
```
from the main directory /store-app

Then go to http://localhost:9000/

Keep in mind that each project has it's own node_modules, therefore you nee to run "$ npm install" in each directory if you want to make some changes.

![alt tag](https://github.com/artemdemo/store-app/blob/master/_img/store-app.png)