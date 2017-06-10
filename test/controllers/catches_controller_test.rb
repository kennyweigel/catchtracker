require 'test_helper'

class CatchesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @catch = catches(:one)
  end

  test "should get index" do
    get catches_url
    assert_response :success
  end

  test "should get new" do
    get new_catch_url
    assert_response :success
  end

  test "should create catch" do
    assert_difference('Catch.count') do
      post catches_url, params: { catch: { fish_id: @catch.fish_id, length: @catch.length, notes: @catch.notes, time: @catch.time, user_id: @catch.user_id } }
    end

    assert_redirected_to catch_url(Catch.last)
  end

  test "should show catch" do
    get catch_url(@catch)
    assert_response :success
  end

  test "should get edit" do
    get edit_catch_url(@catch)
    assert_response :success
  end

  test "should update catch" do
    patch catch_url(@catch), params: { catch: { fish_id: @catch.fish_id, length: @catch.length, notes: @catch.notes, time: @catch.time, user_id: @catch.user_id } }
    assert_redirected_to catch_url(@catch)
  end

  test "should destroy catch" do
    assert_difference('Catch.count', -1) do
      delete catch_url(@catch)
    end

    assert_redirected_to catches_url
  end
end
