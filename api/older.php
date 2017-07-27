<?php

    // PHP 获取的是服务器的系统时间
    // JS 客户端电脑的系时间
    
    // 获得时间
    // echo time();

    // echo '<br/>';

    // 格式化处理
    // echo date('Y-m-d H:i:s', time());

    // echo '<br/>';

    // 可以根据字符生成时间
    // echo strtotime('-1day');

    // echo '<br/>';

    // echo date('Y-m-d', strtotime('-1month'));
    
    // 接收客户端传递的参数
    $day = $_GET['day']; // -1

    // 处理时间
    $date = date('Y-m-d', strtotime($day . 'day'));

    // 代理获得数据
    $data = file_get_contents('https://moment.douban.com/api/stream/date/'.$date.'?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6');

    // 将数据返回
    echo $data;








