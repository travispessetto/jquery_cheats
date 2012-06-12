#JQuery Cheats
JQuery Cheats is Gem that makes it easy to do simple little JavaScript tricks via the JQuery
library.
##Installation
It is as easy as adding this to your Gemfile

```ruby
gem 'jquery_cheats','~>2.1.0'
```

Then add the following to app/assets/application.js

```js
//= require jqueryCheats
```

If you would like charting functionality make sure the following code is in app/assets/application.js

```js
//=require jqplot
```

##Functions

Mouse over image, Image1 changes to Image2 when moused over:

```erb
<%= mouseoverimage("/path/to/image1.jpg","/path/to/image2.jpg") %>
```

Submit Image, allows you to use an image instead of a button for a form:

```erb
<%= submitimage("/path/to/image.png") %>
```

This can also be used with an alternate text parameter

```erb
<%= submitimage("/path/to/image.png","Image Alt Text") %>
```

Simple Mouse Over Link, Provide one image and a link and it will provide a mouse over image
to that link.  The function will look for imagename-hover so make sure your image file is named
right

```erb
<%= simplemolink("/path/to/imgage.png",link_path) %>
```
This will try to find /path/to/image-hover.png as the image to use when moused over.

##Ajax Requests for Field Items

The new assetpipline JavaScript makes it possible to submit form elements via data-remote calls when changed.  Only the following are supported.

###Select Box

To use ajax with jquery_cheats add data-onchange="true" and data-url="/path/to"

###Radio Button

To use with jquery_cheats simply pass a URL into the data-onchange parameter, if you need to send extra parameters use data-params using a serialized
string such as(item=4&item2=3)

```erb
<%= f.radio_button "foo", foo_path, "data-onchange"=>"/path" %>
```

##Graphing

JQuery Cheats comes packaged with JQueryPlots as of 2.1.0, but some functions may not be available until later dates.

###Barchart

JQuery Cheats Barchart is the first graph to be implemented and uses XML to parse the data.
