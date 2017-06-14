class HomeController < ApplicationController
  def index
    @catches = Catch.order('time DESC').limit(1000).map { |x| {lat: x.lat, lng: x.lng} }
    @recentCatches = Catch.order('time DESC').limit(10)
  end
end
