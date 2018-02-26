<?php
header("Access-Control-Allow-Origin: *");
$u = isset($_GET["u"]) ? $_GET["u"] : '';
// 连主库
session_start();
if ($_SESSION['code']!=$u) {
	exit('{"code":0,"msg":"非法操作!"}');
}
$conn = mysqli_connect('w.rdc.sae.sina.com.cn'.':'.'3306','kzl3w535lm','1313mzj34mi1x05z5k3imj1k2j13m2w2hykl1ziz','app_jxjweb');

// Check connection
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
 
class Content {
    public $code  = '00';
    public $content = '00';
}
$content =new Content();
$sql = "SELECT * FROM `2code_code` WHERE user = '".$u."'";
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