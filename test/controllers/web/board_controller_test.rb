require 'test_helper'

class Web::BoardControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    admin = create(:admin)
    sign_in_as admin
    get board_url
    assert_response :success
  end

end
