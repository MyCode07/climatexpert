<?php
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];
    $email = $_POST['email'];

    $city = $_POST['city'];
    $position = $_POST['position'];
    $brand = $_POST['brand'];
    $service = $_POST['service'];
    $url = $_POST['url'];
    $legal_name = $_POST['legal-name'];
    $experience = $_POST['experience'];
    $services = $_POST['services'];
    $content = $_POST['content'];
    $hosting = $_POST['hosting'];
    $domain = $_POST['domain'];
    $more = $_POST['more'];




    $arr = array(
        'Имя' => $name,
        'Телефон' => $phone,
        'Сообщение' => $message,
        'E-mail' => $email,

        'Город' => $city,
        'Должность' =>  $position,
        'Бренд' => $brand,
        'Сфера деятельности' => $service,
        'Ссылка на сайт' => $url,
        'Наименование компании' =>  $legal_name,
        'Сколько лет на рынке' => $experience,
        'Товары' => $services,

        'Контент' => $content,
        'Хостинг' => $hosting,
        'Домен' => $domain,
        'Дополнительно' => $more,
        'Файл' => $file
    );


    $body = '<b>Новый заказ со сайта yanstudio.site.</b>%0A';
    foreach($arr as $key => $value) {
        if(trim(!empty($value))){
            $body .= $key.": <b>".$value."</b>%0A";
        }
    };

    $token = "6295142205:AAFxTDfp4B4elVwF2vTo38bKvpKPJDuqR_Y";
    $chat_id = "-977499279";
    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$body}","r");
    header('Content-type: multipart/form-data');
    echo json_encode($body);
?>
