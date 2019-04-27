# /notification

method: 'POST'

description: Send push notification to one user using his Expo Token

Params:

token (String): User expo token

title (String): The title of the notification

description (String): Content of the notification

# /notification-many
method: 'POST'

description: Send push notification to many user using theire Expo Token

Params:

token (Array of string): Users expo token in a array form

title (String): The title of the notification

description (String): Content of the notification