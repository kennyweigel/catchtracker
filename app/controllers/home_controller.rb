class HomeController < ApplicationController
  def index
    @recentCatches = Catch.order('time DESC').limit(10)
  end
end
