#JQuery Cheats
JQuery Cheats is Gem that makes it easy to do simple little JavaScript tricks via the JQuery
library.
##Installation
It is as easy as adding this to your Gemfile and Running bundle install. Requires Rails 3

```ruby
gem 'jquery_cheats','~>1.2.0'
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
