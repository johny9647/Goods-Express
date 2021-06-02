export function updateUser (state, user_info)
{
    if(user_info)
    {
        state.uid       = user_info.uid;
        state.user_info = user_info;
    }
    else
    {
        state.uid       = null;
        state.user_info = null;
    }

}