module ApplicationHelper

  def is_admin
    current_user != nil and current_user.email == 'admin@test.com'
  end

end
