require 'open-uri'
require 'nokogiri'

COMPLEX_BASE = "http://www.complex.com/"

root = Nokogiri::HTML(open(ARGV[0]))
urls = []

root.xpath('//div[@class = "article-slide-belt-slide"]/a').each do |node|
  urls << node['href']
end

#urls.first do |url|
  page = Nokogiri::HTML(open(COMPLEX_BASE + urls[1]))
  page.xpath('//div[@id = "slide_main_content"]').each do |node|
    puts "something"
    puts node.children
  end
#end