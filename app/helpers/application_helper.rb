module ApplicationHelper

  def is_admin
    if current_user.email != 'admin@test.com'
      redirect_to fish_index_path, :flash => { :alert => 'You must be an admin.' }
      return
    end
  end

end
