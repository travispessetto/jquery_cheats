require "rails/generators"
module JqueryCheats
  class AssetPipelineGenerator < Rails::Generators::Base
    desc "A simple way to get the asset pipeline in your application"
    def generate_assetPipeline
      source_root = File.expand_path("../../../../app/assets/assetpipeline/",__FILE__)
      # need to make a directory to hold them
      if(!File.exists?('app/assets/javascripts'))
        FileUtils.mkdir_p 'app/assets/javascripts'
      end
      if(!File.exists?('app/assets/stylesheets'))
        FileUtils.mkdir_p 'app/assets/stylesheets'
      end
      FileUtils.cp source_root+"/assetpipeline.js",'app/assets/javascripts/application.js'
      FileUtils.cp source_root+"/assetpipeline.css",'app/assets/stylesheets/application.css'
    end
  end
end