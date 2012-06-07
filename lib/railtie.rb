require 'jquery_cheats'

module JQueryCheats
   class Railtie < Rails::Railtie
     initializer "jquery_cheats.hover_image" do
     ActionView::Base.send :include, HoverImage
     end
   end
 end