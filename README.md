#JQuery Cheats

JQUery cheats is a simple gem that is suppose to make a few things easier within the Rails framework.
It is designed to be used with Rails >= 3.0.0 and later will support the asset pipeline requiring Rails >= 3.1.0

##The Asset Pipeline

Because we want to make installing the asset pipeline easier we've provided the following instructions:

  1.  This gem has a generator to include the needed files run ```rails g jquery_cheats:asset_pipeline```
  2.  Make sure that your Gemfile has the following lines of code in it:
  
      ```ruby
      group :assets do
        gem 'sass-rails', " ~> 3.1.0"
        gem 'coffee-rails', " ~> 3.1.0"
        gem 'uglifier'
      end
      gem 'jquery-rails'
      ```
  3.  Replace the following:
  
  ```ruby
  Bundler.require(:default, Rails.env) if defined?(Bundler)
  ```
    with:
  ```ruby
  if defined?(Bundler)
  # If you precompile assets before deploying to production, use this line
  Bundler.require *Rails.groups(:assets => %w(development test))
  # If you want your assets lazily compiled in production, use this line
  # Bundler.require(:default, :assets, Rails.env)
  end
  ```
  4.See the rest on [RailsCasts](http://railscasts.com/episodes/282-upgrading-to-rails-3-1?view=asciicast)
  
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

JQuery Cheats works in conjunction with [plotSimple](http://github.com/plowdawg/plotSimple) to provide you with a graphing interface.

##Change Log

* Version 5.0 removes DOMSubtreeModified due to browser issues.  Work around call barChart(id,xmlurl) in your JavaScript