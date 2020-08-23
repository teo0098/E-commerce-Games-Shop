<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitcac37b154c612440100f4627e9a6995a
{
    public static $prefixLengthsPsr4 = array (
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitcac37b154c612440100f4627e9a6995a::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitcac37b154c612440100f4627e9a6995a::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
