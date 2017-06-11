class AddLatToCatch < ActiveRecord::Migration[5.1]
  def change
    add_column :catches, :lat, :float
  end
end
