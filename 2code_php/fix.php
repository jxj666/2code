<?php

header("Access-Control-Allow-Origin: *"); 
$u = isset($_GET["u"]) ? $_GET["u"] : '';
$c = isset($_GET["c"]) ? $_GET["c"]: '';
$a = isset($_GET["a"]) ? $_GET["a"] : '';
$n = isset($_GET["n"]) ? $_GET["n"]: '';
$i = isset($_GET["i"]) ? $_GET["i"]: '';
$i2 = isset($_GET["i2"]) ? $_GET["i2"]: '';
session_start();
if ($_SESSION['code']!=$u) {
	exit('{"code":0,"msg":"非法操作!"}');
}
// 连主库
$conn = mysqli_connect('w.rdc.sae.sina.com.cn'.':'.'3306','kzl3w535lm','1313mzj34mi1x05z5k3imj1k2j13m2w2hykl1ziz','app_jxjweb');

// Check connection
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
 

$sql="UPDATE  `app_jxjweb`.`2code_code` SET  `content` =  '".$c."',
`address` =  '".$a."',
`name` =  '".$n."',
`info` =  '".$i2."'  WHERE  `2code_code`.`id` ='".$i."' AND `2code_code`.`user` ='".$u."'";



$result = $conn->query($sql);

class Verify {
    public $code  = '00';
}
$verify = new Verify();

// var_dump($result);
if ($result){
    $verify->code = 1;
}else{
$verify->code = 0;
}
echo json_encode($verify);
mysqli_close($conn);
$conn->close();
?>
