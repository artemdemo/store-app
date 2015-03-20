#Store app#

Creating store application with different frameworks

### Application by used technology ###
* AngularJS
* ReactJS
* Backbone
* EmberJS


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

### How to start ###
The easiest way is to run
```
$ grunt serve
```
from the main directory /store-app

![alt tag](https://github.com/artemdemo/store-app/blob/master/_img/store-app.png)