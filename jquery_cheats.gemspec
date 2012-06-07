# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{jquery_cheats}
  s.version = "2.0.0"
  gem.add_dependency "railties", "~> 3.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 1.2") if s.respond_to? :required_rubygems_version=
  s.authors = [%q{Travis Pessettto}]
  s.date = %q{2012-06-07}
  s.description = %q{JQuery functions via the asset pipeline}
  s.email = %q{travis@pessetto.com}
  s.extra_rdoc_files = [%q{README.md}, %q{lib/jquery_cheats.rb}]
  s.files = Dir["{lib,app}/**/*"]+[%q{README.md}, %q{Rakefile}, %q{Manifest}, %q{jquery_cheats.gemspec}]
  s.homepage = %q{https://github.com/plowdawg/jquery_cheats}
  s.rdoc_options = [%q{--line-numbers}, %q{--inline-source}, %q{--title}, %q{Jquery_cheats}, %q{--main}, %q{README.rdoc}]
  s.require_paths = [%q{lib}]
  s.rubyforge_project = %q{jquery_cheats}
  s.rubygems_version = %q{1.8.6}
  s.summary = %q{JQuery Inline tricks}

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('2.0.0') then
    else
    end
  else
  end
end
