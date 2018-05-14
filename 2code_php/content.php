<?php
header("Access-Control-Allow-Origin: *");
$u = isset($_GET["u"]) ? $_GET["u"] : '';
// 连主库
session_start();
if ($_SESSION['code']!=$u) {
	exit('{"code":0,"msg":"非法操作!"}');
}
//$conn = mysqli_connect('路径'.':'.'端口','账号','密码','库名');
include 'conn_sql.php';

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