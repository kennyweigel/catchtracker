class AddDeletedAtToFish < ActiveRecord::Migration[5.1]
  def change
    add_column :fish, :deleted_at, :datetime
    add_index :fish, :deleted_at
  end
end
