class AddLngToCatch < ActiveRecord::Migration[5.1]
  def change
    add_column :catches, :lng, :float
  end
end
