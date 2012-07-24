# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = "jquery_cheats"
  s.version = "4.0.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 1.2") if s.respond_to? :required_rubygems_version=
  s.authors = ["Travis Pessettto"]
  s.date = "2012-06-20"
  s.description = "JQuery, JQPlot graphing, and other useful items for jquery."
  s.email = "travis@pessetto.com"
  s.extra_rdoc_files = ["README.md", "lib/jquery_cheats.rb"]
  s.files = Dir["{lib,app,vendor}/**/*"]+["README.md", "Rakefile", "Manifest", "jquery_cheats.gemspec"]
  s.homepage = "https://github.com/plowdawg/jquery_cheats"
  s.rdoc_options = ["--line-numbers", "--inline-source", "--title", "Jquery_cheats", "--main", "README.md"]
  s.require_paths = ["lib"]
  s.rubyforge_project = "jquery_cheats"
  s.rubygems_version = "1.8.23"
  s.summary = "JQuery Asset Pipeline tricks"

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
    else
    end
  else
  end
end
