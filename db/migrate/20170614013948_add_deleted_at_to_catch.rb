class AddDeletedAtToCatch < ActiveRecord::Migration[5.1]
  def change
    add_column :catches, :deleted_at, :datetime
    add_index :catches, :deleted_at
  end
end
