Gem::Specification.new do |s|
  s.name = %q{jquery_cheats}
  s.version = "5.2.0"
  
  s.required_ruby_version = Gem::Requirement.new(">= 1.2") if s.respond_to? :required_rubygems_version=
  s.authors = %q{Travis Pessetto}
  s.date = Date.today
  s.description = %q{Useful items for JQUERY and an Asset Pipeline genrator}
  s.email = %q{travis@pessetto.com}
  s.extra_rdoc_files = [%q{README.md}, %q{lib/plot_simple.rb}]
  s.files = `git ls-files`.split("\n")
  s.homepage = %q{http://www.github.com/plowdawg/jquery_cheats}
  s.rdoc_options = [%q{--line-numbers}, %q{--inline-source}, %q{--title}, %q{plot_simple}, %q{--main}, %q{readme.rdoc}]
  s.require_paths = [%q{lib}]
  s.rubyforge_project = %q{plot_simple}
  s.rubygems_version = %q{1.8.6}
  s.summary = %q{Useful to create assetpipeline files and other tricks with jquery}

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
    else
    end
  else
  end
end