<#import "commons.ftlh" as c>

<@c.page>
<#if user_profile??>
        <div class="roundbox">
            <div class="user-info">
                <span class="user-name"><a href="/user/${user_profile.id}">${user_profile.login}</a> </span>
                <ul>
                    <li>id:${user_profile.id}</li>
                    <li>login:${user_profile.login}</li>
                    <li>Creation time:${user_profile.creationTime}</li>
                </ul>
            </div>
        </div>
<#else>
    No such user
</#if>

</@c.page>