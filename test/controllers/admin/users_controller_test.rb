require 'test_helper'

class Admin::UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    admin = create(:admin)
    sign_in_as admin
  end
  test "should post create" do
    user = attributes_for(:admin)
    post admin_users_url, params: { user: user }
    assert_response :redirect
  end
  test "should delete destroy" do
    user = create(:admin)
    delete admin_user_url user.id
    assert_response :redirect
  end
  test "should get edit" do
    user = create(:admin)
    get edit_admin_user_url user.id
    assert_response :success
  end
  test "should get index" do
    get admin_users_url
    assert_response :success
  end
  test "should get new" do
    get new_admin_user_url
    assert_response :success
  end
  test "should get show" do
    user = create(:admin)
    get admin_users_url
    assert_response :success
  end
  test "should patch update" do
    user = create(:admin)
    user_attrs = attributes_for(:admin)
    patch admin_user_url user.id, params: { user: user_attrs }
    assert_response :redirect
  end
end