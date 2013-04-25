require "rails/generators"
module JQueryCheats
  class AssetPipelineGenerator < Rails::Generators::Base
    desc "A simple way to get the asset pipeline in your application"
    def generate_assetpipeline
      source_root = File.expand_path("../../app/assets/assetpipeline",__FILE__)
      #need to make a directory to hold them
      FileUtils.makedir_p 'app/assets/javascripts'
      FileUtils.makedir 'app/assets/stylesheets'
      FileUtils.copy_entry source_root+"assetpipeline.js",'app/assets/javascripts/application.js'
      FileUtils.copy_entry source_root+"assetpipeline.css",'app/assets/stylesheets/application.css'
    end
  end
end