Для того, чтобы производилась авторизация в Django, нужно добавить в **Headers** пару

**Key**: `Authorization`, **Value**: `Token <token>`

>[[!warning]]
>Если вместо этого добавлять токен через **Authorization**, выбирая тип авторизации (**Type**) Bearer Token, то в заголовке он добавит к токену еще префикс `Bearer`.
