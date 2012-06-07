require 'rubygems'
require 'rake'
require 'echoe'

Echoe.new('jquery_cheats', '2.0.0') do |p|
  p.description    = "JQuery Inline tricks"
  p.url            = "https://github.com/plowdawg/jquery_cheats"
  p.author         = "Travis Pessettto"
  p.email          = "travis@pessetto.com"
  p.ignore_pattern = ["tmp/*", "script/*"]
  p.development_dependencies = []
end

Dir["#{File.dirname(__FILE__)}/tasks/*.rake"].sort.each { |ext| load ext }