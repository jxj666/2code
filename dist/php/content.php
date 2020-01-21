<?php
/*
 * @Description: 
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-01-25 13:29:44
 * @LastEditTime : 2020-01-21 10:54:55
 * @LastEditors  : 靳肖健
 */
// 连主库
include 'conn_sql.php';

$u = isset($_GET["u"]) ? $_GET["u"] : '';
// 连主库
session_start();
if (!$_SESSION || $_SESSION['code']!=$u) {
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
// $sql = "SELECT * FROM `2code_code` WHERE user = '".$u."'";
$sql = "SELECT * 
FROM  `2code_code` 
WHERE  `user` LIKE  '".$u."' 
ORDER BY  `id` DESC 
LIMIT 0 , 30";
$result = $conn->query($sql);
$data = array();
if ($result) {
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