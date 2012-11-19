require 'open-uri'
require 'nokogiri'

COMPLEX_BASE = "http://www.complex.com/"

root = Nokogiri::HTML(open(ARGV[0]))
urls = []

root.xpath('//div[@class = "article-slide-belt-slide"]/a').each do |node|
  urls << node
end

master = root.xpath('//div[@id = "slide_main_content"]').first
urls.shift

urls.each do |url|
  page = Nokogiri::HTML(open(COMPLEX_BASE + url['href']))
  page.xpath('//div[@id = "slide_main_content"]').each do |node|
    master.add_next_sibling(node)
  end
end

puts root.to_html

