<?php
/*
 * @Description: 
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-01-25 13:29:44
 * @LastEditTime: 2020-01-21 10:57:03
 * @LastEditors: 靳肖健
 */
// 连主库
include 'conn_sql.php';

$u = isset($_GET["u"]) ? $_GET["u"] : '';
$n = isset($_GET["n"]) ? $_GET["n"] : '';
$c = isset($_GET["c"]) ? $_GET["c"] : '';
$a = isset($_GET["a"]) ? $_GET["a"] : '';
// 连主库
session_start();
if ($_SESSION['code']!=$u) {
	exit('{"code":0,"msg":"非法操作!"}');
}


// Check connection
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
 
class Content {
    public $code  = '00';
    public $content = '00';
}
$content =new Content();
$sql = "SELECT * 
FROM  `2code_code` 
WHERE address LIKE  '%".$a."%'
AND name LIKE  '%".$n."%'
AND content LIKE  '%".$c."%'
AND user =  '".$u."'
ORDER BY `id` DESC ";

$result = $conn->query($sql);
$data = array();
if (mysqli_num_rows($result) > 0) {
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}
$content->code='1';
$content->content=$data; 
} else {
 $content->code='0';   
}
echo json_encode($content);
$conn->close();
?>